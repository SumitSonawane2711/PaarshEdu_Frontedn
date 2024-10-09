import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { FaStar } from "react-icons/fa"
import { Skeleton } from "../ui/skeleton"
import { useNavigate } from "react-router-dom"
import React from "react"




// Define a type for the product prop
interface Product {
    id: number
    name: string
    href: string
    originalPrice?: number
    imageSrc: string
    description: string
    discountPrice: number
}

interface CarouselSizeProps {
    products?: Product[] // Optional products array
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    role?: string      // Optional error message
}

export const CarouselSize = React.memo(({ products = [], status = 'idle', error = "", role = '' }: CarouselSizeProps) => {

    // console.log("status :", status);

    const navigate = useNavigate();

    if (error) {
        return (
            <div className="text-center p-6">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <Carousel
            plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-5/6 my-10"
        >
            <CarouselContent>
                {products.map((product) => (
                    <CarouselItem onClick={() => navigate(`/course_details/${product.id}`)} key={product.id} className="md:basis-1/2 lg:basis-1/4 ">
                        <div className="p-1 ">
                            <Card className="h-full">
                                <CardContent className="aspect-auto border-none p-0  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                                    {status === 'idle' || status === 'loading' || status === 'failed' ?
                                       (<>
                                            <Skeleton className="h-72 w-full rounded rounded-b-none" />
                                            <div className="space-y-2 m-4">
                                                <Skeleton className="h-6 w-full" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        </>):
                                        (<>
                                            <div className="h-72 rounded ">
                                                <img
                                                    alt={product.name}
                                                    src={product.imageSrc}
                                                    className="rounded rounded-b-none w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="p-3 rounded-b-lg">
                                                <h3 className="text-lg font-bold text-ellipsis overflow-hidden line-clamp-1">
                                                    {product.name}
                                                </h3>
                                                <p className="text-md py-2">
                                                    ₹{product.originalPrice}
                                                    {product.originalPrice && (
                                                        <span className="ml-3 text-gray-600 line-through">
                                                            ₹{product.originalPrice}
                                                        </span>
                                                    )}
                                                </p>
                                                {role === "topRated" ?
                                                    <div className="flex my-1">
                                                        {Array.from({ length: 5 }, (_, starIndex) => (
                                                            <FaStar
                                                                key={starIndex}
                                                                className={`text-md ${starIndex < 3
                                                                    ? "text-yellow-500"
                                                                    : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div> : ''}
                                            </div>
                                        </>)
                                        
                                        }
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='hidden sm:flex' />
            <CarouselNext className='hidden sm:flex' />
        </Carousel>
    )
})
