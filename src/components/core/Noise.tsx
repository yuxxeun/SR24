function Noise({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative">
        <div className="bg-noise" />
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}

export default Noise;
