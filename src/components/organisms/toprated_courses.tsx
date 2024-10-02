import { getAllCategories } from "@/core/redux/slices/category_slice";
import { fetchCourses } from "@/core/redux/slices/course_slice";
import { AppDispatch, RootState } from "@/core/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { CardContent } from "../ui/card";
import { FaStar } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";


function TopRatedCourse() {
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.items);
  const categories = useSelector(
    (state: RootState) => state.courses.categories
  );
  const [activeCategory, setActiveCategory] = useState("Computer/IT");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const currentCategory = categories.find(
      (category) => category.name === activeCategory
    );
    if (currentCategory) {
      setCategoryId(currentCategory.id);
    }
  }, [activeCategory, categories]);

  const navItems = categories.map((category) => ({
    name: category.name,
    slug: `/${category.name}`,
    categoryId: category.id,
  }));

  const products = courses
    .filter((course) => course.categoryId === categoryId)
    .map((course) => ({
      id: course.id,
      description: course.description,
      name: course.title || "Data Analyst Master Course",
      href: `/product-detail/${course.id}`,
      imageSrc:
        course.imageUrl ||
        "https://learn.g2.com/hs-fs/hubfs/Screen%20Shot%202020-01-24%20at%208.01.03%20AM.png?width=555&name=Screen%20Shot%202020-01-24%20at%208.01.03%20AM.png",
      discountPrice: course.price,
      originalPrice: 1000,
    }));

  return (
    <div className="p-4 max-w-full min-w-full">
      <Carousel className="relative max-w-screen font-bold text-xl flex flex-wrap justify-center px-1">
        <CarouselContent className="flex items-center relative -ml-1">
          {navItems.length > 0 ? (
            navItems.map((item, index) => (
              <CarouselItem key={index} className="flex-none rounded-full">
                <button
                  onClick={() => {
                    setActiveCategory(item.name);
                  }}
                  className={`py-2 pr-4 pl-3 duration-200 border-b ${
                    activeCategory === item.name
                      ? "underline underline-offset-2"
                      : ""
                  } border-yellow-300 bg-blue-950 mx-2 rounded-full text-white flex justify-center p-5`}
                >
                  {item.name}
                </button>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="flex-none rounded-full">
              <button className="py-2 pr-4 pl-3 duration-200 border-b border-yellow-300 bg-blue-950 mx-2 rounded-full text-white flex justify-center p-5">
                Loading...
              </button>
            </CarouselItem>
          )}
        </CarouselContent>
        <div className="absolute flex w-full left-0">
          <CarouselNext className="hidden sm:flex mb-52 bg-slate-800 text-white size-8 border-cyan-400 -mr-10 right-0 mt-6 hover:bg-slate-900 cursor-pointer" />
          <CarouselPrevious className="hidden sm:flex bg-slate-800 text-white size-8 border-cyan-400 -ml-10 mt-6 hover:bg-slate-900 cursor-pointer left-0" />
        </div>
      </Carousel>

      <hr className="border-2 border-blue-800 my-4 rounded-full" />

      <Carousel
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
        opts={{ align: "start", loop: true }}
        className="flex  mt-4 px-2 "
      >
        <CarouselContent className="flex items-center">
          {products.length > 0 ? (
            products.map((product, index) => (
              <CarouselItem
                key={index}
                className="flex-none mr-5 h-[450px] w-[250px] md:w-[300px] border rounded-xl"
              >
                <Link to={product.href} className="block overflow-hidden">
                  <CardContent className="w-full rounded-xl hover:bg-slate-100 p-0">
                    <img
                      alt={product.name}
                      src={product.imageSrc}
                      className="w-full h-72 rounded-b-none rounded-xl lg:aspect-none group-hover:opacity-75"
                    />
                    <div className="flex flex-col p-3">
                      <h3 className="text-lg font-bold truncate">
                        {product.name}
                      </h3>
                      <div className="flex my-1">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <FaStar
                            key={starIndex}
                            className={`text-md ${
                              starIndex < 3
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-md font-bold text-gray-900">
                        ₹{product.discountPrice}
                        <span className="ml-3 text-gray-600 line-through">
                          ₹{product.originalPrice}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="flex-none w-80 mr-1 h-[450px]">
              <div className="p-0 bg">
                <CardContent className="w-72 rounded-xl hover:bg-slate-100 p-0">
                  <div className="h-72 flex items-center justify-center">
                    <Skeleton className="h-full w-full rounded-xl bg-gray-100" />
                  </div>
                  <div className="flex flex-col p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                    <Skeleton className="h-4 w-1/3 bg-gray-200" />
                  </div>
                </CardContent>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselNext className="hidden sm:flex bg-slate-800 text-white size-8 border-cyan-400 -mr-10 right-0 hover:bg-slate-900 cursor-pointer" />
        <CarouselPrevious className="hidden sm:flex bg-slate-800 text-white size-8 border-cyan-400 -ml-10 hover:bg-slate-900 cursor-pointer" />
      </Carousel>
    </div>
  );
}

export default TopRatedCourse;
