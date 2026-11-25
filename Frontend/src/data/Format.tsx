export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatDateTime = (iso) =>
    new Date(iso).toLocaleString('es-PE', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });