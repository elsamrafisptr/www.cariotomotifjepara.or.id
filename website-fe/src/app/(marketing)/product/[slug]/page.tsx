const ProductDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  return (
    <div className="flex h-screen w-full items-center justify-center">halo {slug}</div>
  )
}

export default ProductDetails
