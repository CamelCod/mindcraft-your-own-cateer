import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import Button from '../ui/Button';
import { postSurveyData } from '../../services/apiService';
import type { SurveyResponse, ApplicationFrequency } from '../../types';

const ValidationView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  
  // Survey State
  const [frustration, setFrustration] = useState('');
  const [applicationFrequency, setApplicationFrequency] = useState<ApplicationFrequency>('Weekly');
  const [wantsConciergeDemo, setWantsConciergeDemo] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenModal = () => {
    if (jobDescription.trim().length > 10) {
      setIsModalOpen(true);
    } else {
        alert("Please paste a job description first!");
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (!submitSuccess) {
      setFrustration('');
      setApplicationFrequency('Weekly');
      setWantsConciergeDemo(null);
      setEmail('');
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wantsConciergeDemo === null || !email) {
      setSubmitError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const surveyData: SurveyResponse = {
      frustration,
      applicationFrequency,
      wantsConciergeDemo,
      email,
      jobDescription,
    };

    try {
      await postSurveyData(surveyData);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isFormValid = wantsConciergeDemo !== null && email.trim().length > 0 && email.includes('@');

  return (
    <>
      <div className="text-center pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Paste a job description → get a job-specific resume in minutes.
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
          Always up to date • ATS-aligned • Built from your evolving profile
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-2">
            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="w-full p-2 border-0 rounded-md focus:ring-2 focus:ring-slate-500 transition resize-none"
                placeholder="Paste the full job description here to get started..."
            />
        </div>
        <div className="mt-4">
            <Button 
              onClick={handleOpenModal} 
              className="w-full text-lg py-3"
              disabled={jobDescription.trim().length <= 10}
            >
              Generate Tailored Resume
            </Button>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="One last step...">
        {!submitSuccess ? (
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="frustration" className="block text-sm font-medium text-slate-700">What frustrates you most about tailoring resumes today? <span className="text-slate-400">(Optional)</span></label>
                <textarea id="frustration" value={frustration} onChange={e => setFrustration(e.target.value)} rows={3} className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">How often do you apply for roles?</label>
                <select value={applicationFrequency} onChange={e => setApplicationFrequency(e.target.value as ApplicationFrequency)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm rounded-md">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Rarely</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700">Would you try a concierge demo where we tailor one resume for you? <span className="text-red-500">*</span></label>
                <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center space-x-2"><input type="radio" name="concierge" checked={wantsConciergeDemo === true} onChange={() => setWantsConciergeDemo(true)} className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-slate-300" /> <span>Yes</span></label>
                    <label className="flex items-center space-x-2"><input type="radio" name="concierge" checked={wantsConciergeDemo === false} onChange={() => setWantsConciergeDemo(false)} className="focus:ring-slate-500 h-4 w-4 text-slate-600 border-slate-300" /> <span>No</span></label>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email to send your demo result: <span className="text-red-500">*</span></label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md focus:ring-slate-500 focus:border-slate-500" placeholder="you@example.com" />
              </div>
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
            </div>
            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <Button type="submit" isLoading={isSubmitting} disabled={!isFormValid || isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <h3 className="text-xl font-bold text-green-700">Thank You!</h3>
            <p className="mt-2 text-slate-600">We've received your response. If you opted for the demo, we'll be in touch shortly.</p>
            <div className="mt-6">
                <Button onClick={handleCloseModal}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ValidationView;
