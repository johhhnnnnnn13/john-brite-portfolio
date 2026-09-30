import { Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { profile } from '../../content/portfolio';
import { api } from '../../services/api';
import { Button } from '../../components/ui/Button';

type State = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState('submitting'); setError('');
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    try {
      await api.contact(data);
      setState('success'); form.reset();
    } catch {
      setState('error');
      setError(`The form service is unavailable. Your message is still here; you can also email ${profile.email}.`);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row"><label>Name<input required name="name" maxLength={100} autoComplete="name" /></label><label>Email<input required type="email" name="email" maxLength={254} autoComplete="email" /></label></div>
      <label>Subject<input required name="subject" maxLength={150} /></label>
      <label>Message<textarea required name="message" maxLength={3000} rows={6} /></label>
      <label className="honeypot" aria-hidden="true">Company website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-footer">
        <Button type="submit" disabled={state === 'submitting' || state === 'success'}>{state === 'submitting' ? 'Sending…' : state === 'success' ? 'Message received' : <>Send message <Send size={17} /></>}</Button>
        {state === 'success' && <p className="success" role="status">Thanks. Your message has been accepted.</p>}
        {state === 'error' && <p className="error" role="alert">{error}</p>}
      </div>
    </form>
  );
}
