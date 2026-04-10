export const formatDate = (isoDateString: Date): string => {
  const formatDate = isoDateString.toLocaleString('es-BO', {
    timeZone: 'America/La_Paz',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return formatDate
}

export function extractPublicIdFromUrl(url: string | undefined): string {
  if (url) {
    const parts = url.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) {
      throw new Error('Invalid Cloudinary URL');
    }

    const publicIdParts = parts.slice(uploadIndex + 2);
    let publicId = publicIdParts.join('/');
    publicId = publicId.replace(/\.[^/.]+$/, "");
    return publicId;
  }
  return '';
}

export const formatCurrency = (amout: number): string => {
  return new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amout)
}
