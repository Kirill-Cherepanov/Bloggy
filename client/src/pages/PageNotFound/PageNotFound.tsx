export default function PageNotFound() {
  return (
    <div className="px-page h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <h2 className="font-display font-bold text-[120px] xs:text-[180px] sm:text-[240px] md:text-[300px] leading-[200px] sm:leading-[260px] md:leading-[320px] text-center">
        404
      </h2>
      <p className="text-center sm:text-lg md:text-xl lg:text-2xl">
        Don't panic, but the page you were looking for... is not here (✖╭╮✖)
      </p>
    </div>
  );
}
