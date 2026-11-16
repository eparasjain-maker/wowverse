import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@wowverse.in');
  const [password, setPassword] = useState('wowverse2025');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await adminService.login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Use admin@wowverse.in / wowverse2025');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-surface border border-surface-border rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-wow/10 border border-wow/20 flex items-center justify-center mx-auto mb-4 text-wow">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ivory tracking-tight">
            WOWVERSE Studio Portal
          </h2>
          <p className="text-xs text-ivory-dim mt-1">
            Restricted access for creative directors and studio administration.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ivory-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wowverse.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory-dim mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-ivory-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-light border border-surface-border text-xs text-ivory focus:outline-none focus:border-wow"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full text-center"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-white/5 text-center text-[11px] text-ivory-dim">
          Default Master Access: <code className="text-wow">admin@wowverse.in</code> / <code className="text-wow">wowverse2025</code>
        </div>
      </div>
    </div>
  );
};
