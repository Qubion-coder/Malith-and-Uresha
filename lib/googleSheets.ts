export type GoogleSheetFormType = 'rsvp' | 'wish';

interface SubmitPayload {
  formType: GoogleSheetFormType;
  name: string;
  guests?: string;
  dietary?: string;
  message?: string;
}

export async function submitToGoogleSheets(payload: SubmitPayload): Promise<void> {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbynMOO6Ry35LMGlLJXReuVfTsvkpObOavMieNeNA-i9pI5Ed0PYZ0ubwLkksbac7_sYYg/exec';

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: 'wedding-site',
    }),
  });
}
