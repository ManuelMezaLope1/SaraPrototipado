export default function Logo({ className = '', imgClassName = 'h-[48px] w-auto md:h-[56px]', link = true }){
  return(
    <img
      src="/logo.png"
      alt="SARA — Estilo que te acompaña"
      className={imgClassName} 
      style={{
        width: '150px',
        height: '80px',
        objectFit: 'contain'
      }}
    />
  )
}