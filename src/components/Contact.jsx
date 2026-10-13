import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        subject: '', 
        message: '' 
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ 
                type: 'error', 
                message: t('contact.required')
            });
            setIsLoading(false);
            return;
        }

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
            const result = await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || 'Mensagem do Portfólio',
                    message: formData.message,
                },
                publicKey
            );

            if (result.status === 200) {
                setStatus({ 
                    type: 'success', 
                    message: t('contact.success')
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error) {
            console.error('Erro:', error);
            setStatus({ 
                type: 'error', 
                message: t('contact.error')
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contato" className="container-section" aria-label="Contato">
            <h2 className="section-title">{t('contact.title')}</h2>
            <div className="section-sub">{t('contact.subtitle')}</div>
            
            <div className="contact-wrapper">
                <div className="form-container">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">{t('contact.name')}</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                placeholder={t('contact.name')}
                                required 
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{t('contact.email')}</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                placeholder="seu@email.com" 
                                required 
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subject">{t('contact.subject')}</label>
                            <input 
                                type="text" 
                                id="subject"
                                name="subject"
                                placeholder={t('contact.subject')}
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">{t('contact.message')}</label>
                            <textarea 
                                id="message"
                                name="message"
                                rows="4" 
                                placeholder={t('contact.message')}
                                required
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        
                        {status.message && (
                            <div className={`form-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}
                        
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><i className="fas fa-spinner fa-spin"></i> {t('contact.sending')}</>
                            ) : (
                                <><i className="fas fa-paper-plane"></i> {t('contact.send')}</>
                            )}
                        </button>
                    </form>
                </div>
                
                <div className="social-container">
                    <div className="social-box">
                        <i className="fab fa-linkedin" style={{ color: '#0A66C2' }}></i>
                        <h3>{t('contact.linkedin')}</h3>
                        <p>{t('contact.linkedin_desc')}</p>
                        <a 
                            href="https://linkedin.com/in/rairsonfernandes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <i className="fab fa-linkedin"></i> {t('contact.linkedin_btn')}
                        </a>
                    </div>
                    <div className="social-box">
                        <i className="fab fa-github" style={{ color: '#ffffff' }}></i>
                        <h3>{t('contact.github')}</h3>
                        <p>{t('contact.github_desc')}</p>
                        <a 
                            href="https://github.com/rairsonfernandes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <i className="fab fa-github"></i> {t('contact.github_btn')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
