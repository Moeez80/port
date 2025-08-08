export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex space-x-2 mb-4 justify-center">
          <div className="w-3 h-3 bg-accent rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-accent rounded-full loading-dot"></div>
          <div className="w-3 h-3 bg-accent rounded-full loading-dot"></div>
        </div>
        <p className="text-muted-foreground text-sm">Loading Portfolio...</p>
      </div>
    </div>
  );
}
