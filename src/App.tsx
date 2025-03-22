
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// Lazy load the Preview page to improve initial load performance
const Preview = lazy(() => import("./pages/Preview"));

// Create a fallback component for suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-factsheet-blue"></div>
  </div>
);

// Simple error boundary component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
    <p className="mb-4 max-w-md mx-auto text-gray-700">{error.message}</p>
    <button 
      onClick={() => window.location.href = '/'}
      className="px-4 py-2 bg-factsheet-blue text-white rounded-md hover:bg-factsheet-blue/90"
    >
      Return to Home
    </button>
  </div>
);

// Create the query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="/index" element={<Index />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
