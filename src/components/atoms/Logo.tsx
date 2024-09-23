function Logo({
    width = "100px",
    className,
  }: {
    width: string;
    className: string;
  }) {
    return (
      <div className={className}>
        <img src='/public/PAARSHEDU LOGO (1).png' width={width} />
      </div>
    );
  }
  
  export default Logo;