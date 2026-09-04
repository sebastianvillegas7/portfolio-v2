type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div aria-label={`${title} gallery`} className="grid gap-4 md:grid-cols-2">
      {images.map((image) => (
        <div key={image} className="aspect-video rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          {image}
        </div>
      ))}
    </div>
  );
}
