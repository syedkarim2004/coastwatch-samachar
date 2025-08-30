import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, MapPin, Upload, Camera, Send, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CoastalMap from '@/components/CoastalMap';

const ReportHazard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  const [formData, setFormData] = useState({
    reporterName: '',
    contactNumber: '',
    email: '',
    hazardType: '',
    severity: [3],
    location: {
      lat: null as number | null,
      lng: null as number | null,
      address: ''
    },
    description: '',
    anonymous: false,
    attachments: [] as File[]
  });

  const hazardTypes = [
    { value: 'storm-surge', label: '🌪 Storm Surge', description: 'Unusual rise in seawater level' },
    { value: 'high-waves', label: '🌊 High Waves', description: 'Dangerous wave conditions' },
    { value: 'rip-current', label: '🌊 Rip Current', description: 'Strong offshore current' },
    { value: 'pollution', label: '🛢 Pollution', description: 'Oil spills, chemical discharge' },
    { value: 'erosion', label: '🏖 Beach Erosion', description: 'Significant coastal erosion' },
    { value: 'tsunami', label: '🌊 Tsunami Warning', description: 'Potential tsunami threat' },
    { value: 'other', label: '⚠️ Other', description: 'Other coastal hazard' }
  ];

  const severityLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Critical'];

  const handleLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    setFormData(prev => ({
      ...prev,
      location: {
        lat: location.lat,
        lng: location.lng,
        address: location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit to backend or queue for offline sync
    console.log('Form submitted:', formData);
    
    if (isOffline) {
      // Store in localStorage for offline sync
      const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
      offlineReports.push({
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        synced: false
      });
      localStorage.setItem('offlineReports', JSON.stringify(offlineReports));
      alert('Report saved offline. Will sync when connection is restored.');
    } else {
      alert('Report submitted successfully!');
    }
    
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Report Coastal Hazard</h1>
                <p className="text-sm text-muted-foreground">
                  Help protect our coastline by reporting hazards
                </p>
              </div>
            </div>
            
            {isOffline && (
              <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Offline Mode</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Location & Contact' :
                currentStep === 2 ? 'Hazard Details' : 'Review & Submit'
              }
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Location and Contact */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Select Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64">
                      <CoastalMap 
                        height="100%" 
                        showControls={false}
                        onLocationSelect={handleLocationSelect}
                      />
                    </div>
                    
                    {formData.location.lat && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Location Selected</p>
                        <p className="text-xs text-green-600 mt-1">
                          {formData.location.address}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous">Report Anonymously</Label>
                    <Switch
                      id="anonymous"
                      checked={formData.anonymous}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, anonymous: checked }))
                      }
                    />
                  </div>

                  {!formData.anonymous && (
                    <>
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.reporterName}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, reporterName: e.target.value 
                          }))}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <Label htmlFor="contact">Contact Number *</Label>
                        <Input
                          id="contact"
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, contactNumber: e.target.value 
                          }))}
                          placeholder="+91 9876543210"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, email: e.target.value 
                          }))}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={nextStep} 
                    className="w-full"
                    disabled={!formData.location.lat || (!formData.anonymous && !formData.reporterName)}
                  >
                    Next: Hazard Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Hazard Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Hazard Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {hazardTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.hazardType === type.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setFormData(prev => ({ 
                          ...prev, hazardType: type.value 
                        }))}
                      >
                        <div className="text-lg font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {type.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Severity Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Slider
                      value={formData.severity}
                      onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, severity: value 
                      }))}
                      max={4}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {severityLabels.map((label, index) => (
                        <span key={index} className={
                          index === formData.severity[0] ? 'font-bold text-primary' : ''
                        }>
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-medium">
                        Current: {severityLabels[formData.severity[0]]}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Description & Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, description: e.target.value 
                      }))}
                      placeholder="Describe what you observed, when it started, current conditions, etc."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Photo/Video Evidence</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Drop files here or click to upload
                        </div>
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <label>
                              <Camera className="h-4 w-4 mr-1" />
                              Choose Files
                              <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </label>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {formData.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                    <Button 
                      onClick={nextStep} 
                      className="flex-1"
                      disabled={!formData.hazardType || !formData.description}
                    >
                      Review Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Review Your Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    {formData.anonymous ? (
                      <p className="text-muted-foreground">Anonymous Report</p>
                    ) : (
                      <div className="space-y-1 text-sm">
                        <p>Name: {formData.reporterName}</p>
                        <p>Contact: {formData.contactNumber}</p>
                        {formData.email && <p>Email: {formData.email}</p>}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.location.address}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Hazard Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>Type: {hazardTypes.find(t => t.value === formData.hazardType)?.label}</p>
                      <p>Severity: {severityLabels[formData.severity[0]]}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Attachments</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.attachments.length} file(s) attached
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {formData.description}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    <Send className="h-4 w-4 mr-1" />
                    Submit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;