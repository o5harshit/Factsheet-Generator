import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import {
  exportToCSV,
  generateTemplateData,
  parseCSVToFactsheetData,
} from "@/utils/exportToCSV";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || ""
);

interface UploadFormProps {
  onDataUploaded: (data: any) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onDataUploaded }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [used, setUsed] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    const checkUserStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUser(null);
        setIsChecking(false);
        return;
      }
  
      setUser(data.user);
      const userId = data.user.id;
  
      // Fetch stored data from localStorage
      const storedData = localStorage.getItem(`user_${userId}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUploadCount(parsedData.uploadCount || 0);
        setPaymentDone(parsedData.paymentDone || false);
        if (parsedData.uploadCount >= 1 && !parsedData.paymentDone) {
          setUsed(true);
        }
        if (uploadCount >= 1 && !paymentDone) {
          setUsed(true);
        }
      }
  
  
      setIsChecking(false);
    };
  
    checkUserStatus();
  }, [uploadCount, paymentDone]);
  


  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsed(false);
    localStorage.removeItem(`user_${user?.id}`);
  };

  const handleDownloadTemplate = () => {
    exportToCSV(generateTemplateData(), "factsheet_template.csv");
    toast({
      title: "Template Downloaded",
      description: "Fill in the template and upload it.",
      duration: 3000,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    if (!user) {
      toast({
        title: "Sign in Required",
        description: "Please sign in before uploading a file.",
        variant: "destructive",
      });
      return;
    }

    if (used) {
      redirectToPayment();
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvData = e.target?.result as string;
        const factsheetData = parseCSVToFactsheetData(csvData);
        onDataUploaded(factsheetData);

        toast({
          title: "File Uploaded Successfully",
          description: "Your data has been processed.",
          duration: 3000,
        });

        // Mark the user as "used: true" in the database
        const { error } = await supabase
          .from("users")
          .upsert([{ id: user.id, used: true }]);

        if (!error) setUsed(true);
      } catch (error) {
        console.error("Error processing file:", error);
        toast({
          title: "Error Processing File",
          description: "Ensure the file is a valid CSV.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      toast({
        title: "Error Reading File",
        description: "There was an error reading your file.",
        variant: "destructive",
        duration: 5000,
      });
      setIsUploading(false);
    };

    reader.readAsText(file);
  };

  const redirectToPayment = async () => {
    const amount = 5.00; // Set the price
    const currency = "USD";
    const userId = user?.id;
  
    if (!userId) {
      toast({
        title: "Sign in Required",
        description: "Please sign in before making a payment.",
        variant: "destructive",
      });
      return;
    }
  
    // Redirect user to PayPal checkout (Replace with your real PayPal/Stripe link)
    const paymentUrl = `https://www.paypal.com/paypalme/yourpaypal/${amount}${currency}`;
    
    // Store a pending payment in Supabase
    await supabase.from("payments").insert([{ user_id: userId, status: "pending" }]);
  
    // Redirect to PayPal
    window.location.href = paymentUrl;
  };

  if (isChecking) {
    return <p>Checking user status...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8 glass-card rounded-xl animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Data</h2>
        <p className="text-gray-600">
          Download the template, fill it with your fund data, and upload it.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <Button onClick={handleDownloadTemplate} className="bg-factsheet-blue text-white">
            Download Template
          </Button>
        </div>

        {!user && (
          <p className="text-center text-red-500 font-medium">
            Please login first to upload a file.
          </p>
        )}

        {user ? (
          <>
            <Button onClick={handleLogout} className="bg-red-500 text-white w-full">
              Logout
            </Button>

            {used ? (
              <Button onClick={redirectToPayment} className="bg-yellow-500 text-white w-full">
                Pay to Continue
              </Button>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-10 text-center ${
                  isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p>{fileName || "Drag and drop your file here"}</p>
                <Label htmlFor="file-upload" className="cursor-pointer text-blue-500">
                  Select File
                </Label>
                <Input id="file-upload" type="file" accept=".csv" className="sr-only" onChange={handleFileChange} disabled={isUploading} />
              </div>
            )}
          </>
        ) : (
          <Button onClick={handleGoogleSignIn} className="bg-blue-500 text-white w-full">
            Sign in with Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
