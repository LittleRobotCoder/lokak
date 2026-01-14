export default function SectionDivider() {
  return (
    <div className="my-12 flex w-full justify-center px-4 md:my-16 md:px-6">
      <div className="relative h-px w-full max-w-6xl">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <div className="absolute inset-0 h-1 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-xl" />
      </div>
    </div>
  );
}
