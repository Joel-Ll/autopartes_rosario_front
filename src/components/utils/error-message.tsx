
export default function ErrorMessage({children}: React.PropsWithChildren) {
  return (
    <p className='bg-destructive text-white text-center py-2 whitespace-nowrap rounded-md text-sm font-medium'>{children}</p>
  )
}
