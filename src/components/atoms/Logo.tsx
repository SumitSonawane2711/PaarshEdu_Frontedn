function Logo({
    width = "100px",
    className,
  }: {
    width: string;
    className: string;
  }) {
    return (
      <div className={className}>
        <img src="/PAARSHEDU LOGO.png" width={width} />
      </div>
    );
  }
  
  export default Logo;