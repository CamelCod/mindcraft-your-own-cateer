import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';

const HomeView: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="text-center py-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Welcome, Adventurer!
                </h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Your journey to the perfect resume starts here. Complete quests to build your profile, then tailor it for any job description.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Your Profile Quest</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600">
                            Embark on a quest to build a comprehensive professional profile. Answer questions, unlock achievements, and level up your resume's readiness.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tailor Your Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-600">
                            Paste a job description to instantly generate a tailored resume that highlights your most relevant skills and experiences.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HomeView;