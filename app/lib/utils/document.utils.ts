/**
 * Utilitaires pour la gestion des documents
 */

/**
 * Télécharge un fichier local
 */
export function downloadLocalFile(filePath: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Télécharge un fichier depuis un Blob
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Détermine le fichier PDF à télécharger selon le contexte
 */
export function getPDFPath(title: string, activeTab: number): string {
  // Tab 1 = Guide
  if (activeTab === 1) {
    if (title.toLowerCase().includes('famille')) {
      return '/assets/famille.pdf';
    }
    if (title.toLowerCase().includes('rappel')) {
      return '/assets/procedure.pdf';
    }
  }
  
  // Par défaut, bulletin de solde
  return '/assets/billet.pdf';
}

/**
 * Génère un nom de fichier sécurisé
 */
export function sanitizeFileName(fileName: string): string {
  return fileName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
}
