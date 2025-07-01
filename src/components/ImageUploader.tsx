'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

type Props = {
  bucket: string;
  folder?: string;
  onUpload: (url: string) => void;
};

export default function ImageUploader({ bucket, folder = '', onUpload }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const filePath = `${folder}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from(bucket).upload(filePath, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onUpload(publicUrl.publicUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Upload failed: ' + err.message);
      } else {
        alert('Upload failed: An unknown error occurred.');
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <Loader2 className="animate-spin text-muted w-5 h-5" />}
    </div>
  );
}
