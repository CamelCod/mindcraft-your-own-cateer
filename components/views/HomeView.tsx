
import React, { useState, useCallback, useEffect } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { uploadResumeAnchor, getUserProfile } from '../../services/apiService';
import { UploadIcon } from '../ui/Icons';
import type { UserProfile } from '../../types';

const UserProfileCard: React.FC<{ profile: UserProfile | null }> = ({ profile }) => {
    if (!profile) return null;

    const progressPercentage = profile.xpToNextLevel > 0 ? (profile.xp / profile.xpToNextLevel) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Adventurer's Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-600">
                        {profile.level}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">{profile.name}</h3>
                        <p className="text-sm text-slate-500">Level {profile.level}</p>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm font-medium text-slate-600 mb-1">
                        <span>Progress to Next Level</span>
                        <span>{profile.xp} / {profile.xpToNextLevel} XP</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}


const HomeView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
        const profile = await getUserProfile();
        setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
      setStatusMessage(null);
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStatusMessage('Uploading...');
    try {
      const response = await uploadResumeAnchor(selectedFile);
      setLastUpdated(response.lastUpdated);
      setStatusMessage(`Successfully uploaded ${selectedFile.name}. Profile anchor updated.`);
      setSelectedFile(null);
    } catch (err) {
      setError('An error occurred during upload. Please try again.');
      setStatusMessage(null);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  return (
    <div className="space-y-6">
      <UserProfileCard profile={userProfile} />
      <Card>
        <CardHeader>
          <CardTitle>Upload Profile Anchor</CardTitle>
          <p className="text-sm text-slate-500 mt-1">Upload your base resume in JSON, PDF, or DOCX format. This will serve as the source of truth for tailoring.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50">
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <UploadIcon />
              <span className="mt-2 text-sm text-slate-600">
                {selectedFile ? selectedFile.name : 'Click to select a file'}
              </span>
              <span className="text-xs text-slate-500">DOCX, PDF, or JSON</span>
            </label>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.pdf,.json" />
          </div>

          <Button onClick={handleUpload} disabled={!selectedFile || isLoading} isLoading={isLoading} className="w-full">
            {isLoading ? 'Uploading...' : 'Upload Resume'}
          </Button>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {statusMessage && !error && <p className="text-sm text-green-600 text-center">{statusMessage}</p>}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
            <div className="flex justify-between items-center">
                <h3 className="font-medium">Profile Status</h3>
                <div className={`px-2 py-1 text-xs font-semibold rounded-full ${lastUpdated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {lastUpdated ? 'Up to Date' : 'Needs Setup'}
                </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
                Profile anchor last updated: {lastUpdated || 'Never'}
            </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeView;
