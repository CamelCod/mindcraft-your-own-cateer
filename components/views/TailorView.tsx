import React, { useState, useCallback, useEffect } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { tailorResume, getLatestResumes } from '../../services/apiService';
import type { TailoredResume } from '../../types';
import { DownloadIcon } from '../ui/Icons';

const TailorView: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<{ docxPath: string; pdfPath: string; docxFilename: string; pdfFilename: string; } | null>(null);
  const [latestResumes, setLatestResumes] = useState<TailoredResume[]>([]);

  const fetchLatest = useCallback(async () => {
    try {
      const resumes = await getLatestResumes();
      setLatestResumes(resumes);
    } catch (err) {
      console.error("Could not fetch latest resumes", err);
    }
  }, []);

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  const handleGenerate = useCallback(async () => {
    if (jobDescription.trim() === '') {
      setError('Please paste a job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedFiles(null);
    try {
      const files = await tailorResume(jobDescription);
      setGeneratedFiles(files);
      await fetchLatest(); // Refresh the list of latest resumes
    } catch (err) {
      setError('Failed to generate the resume. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jobDescription, fetchLatest]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tailor Resume</CardTitle>
          <p className="text-sm text-slate-500 mt-1">Paste a job description below to generate a resume tailored specifically for that role.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition"
            placeholder="Paste the full job description here..."
          />
          <Button onClick={handleGenerate} isLoading={isLoading} disabled={isLoading} className="w-full">
            {isLoading ? 'Generating...' : 'Generate Resume'}
          </Button>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </CardContent>
      </Card>
      
      {generatedFiles && (
        <Card>
            <CardHeader>
                <CardTitle>Download Your Tailored Resume</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                 <a href={generatedFiles.docxPath} download={generatedFiles.docxFilename} className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                    <DownloadIcon /> DOCX
                </a>
                <a href={generatedFiles.pdfPath} download={generatedFiles.pdfFilename} className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                    <DownloadIcon /> PDF
                </a>
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Latest Tailored Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          {latestResumes.length > 0 ? (
            <ul className="space-y-3">
              {latestResumes.map((resume) => (
                <li key={resume.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <p className="font-medium text-sm text-slate-800">{resume.jobTitle}</p>
                    <p className="text-xs text-slate-500">Generated: {resume.createdAt}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <a href={resume.docxPath} download={resume.docxFilename || 'resume.docx'} className="text-xs font-semibold text-slate-600 hover:underline">DOCX</a>
                    <span className="text-slate-300">|</span>
                    <a href={resume.pdfPath} download={resume.pdfFilename || 'resume.pdf'} className="text-xs font-semibold text-slate-600 hover:underline">PDF</a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No resumes have been generated yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TailorView;
