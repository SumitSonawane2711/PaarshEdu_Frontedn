import { CarouselSize } from "@/components/molecules/carousel";
import Container from "@/components/templates/Container"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCategories, selectAllCategories, selectCategoryStatus } from "@/core/redux/slices/category_slice";
import { fetchCourses, selectAllCourses, selectCoursesError, selectCoursesStatus } from "@/core/redux/slices/course_slice";
import { AppDispatch } from "@/core/redux/store";
import { LucideCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const benefits = [
  {
    title: "Hands-on Training",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
  {
    title: "Certification prep",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
  {
    title: "Customizable content",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
  {
    title: "Insights and analytics",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
  {
    title: "Certification prep",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
  {
    title: "Certification prep",
    para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, labore.",
  },
];

const BenefitsCard = ({ title }: { title: string }) => (
  <div className="relative group flex flex-row-reverse items-center justify-center w-full px-4">
    <div className="group-hover:ml-8 flex flex-col max-w-md cursor-default text-slate-300 w-full bg-gray-800 p-5 rounded-full shadow-[inset_-2px_3px_22px_0px_#2a4365] hover:text-white transition-all duration-300 group-hover:scale-110 ease-in-out">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl text-center w-full transition-all group-hover:font-extrabold font-bold text-ellipsis overflow-hidden line-clamp-1">
          {title}
        </h3>
      </div>
    </div>
    <div className="transform translate-x-4 group-hover:translate-x-3 rounded-full text-white items-center flex justify-center bg-blue-800 -ml-6 w-10 h-10 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] transition-transform duration-300 ease-in-out">
      <LucideCheck />
    </div>
  </div>
);

const strategies = [
  {
    title: "Remote Classrooms",
    content:
      "Run and Manage Interactive webinars to permit a personalized learning experience.",
  },
  {
    title: "Course Manager",
    content:
      "Manage the courses your learners study from different sources and follow them to their individual needs.",
  },
  {
    title: "Paarsh E-Learn",
    content:
      "Provide video, documents, or external links like Youtube-based internal training to complete the pieces of training.",
  },
  {
    title: "Scalable Pricing",
    content:
      "Customize our flexible pricing strategies to suit our learner's needs and budget.",
  },
  {
    title: "Certificates",
    content:
      "Automatically add achievement certificates to the learner’s education tracker whether studied online, offline, or via Google Meet.",
  },
  {
    title: "24/7 Support",
    content:
      "Create an in-person or a virtual classroom session and track the attendance by Online Google Sheet.",
  },
];

const StrategyCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="flex flex-col gap-6 bg-[#050914] opacity-100 w-fit rounded-tl-xl text-white  p-8 rounded-lg mt-8 shadow-md transition-all duration-300 hover:scale-105">
    <h3 className="text-xl sm:text-2xl  font-bold">{title}</h3>
    <p className="text-lg">{content}</p>
  </div>
);

const Home = () => {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector(selectAllCourses);
  const courseStatus = useSelector(selectCoursesStatus);
  const courseError = useSelector(selectCoursesError);
  const categoryStatus = useSelector(selectCategoryStatus);


  const [activeCategory, setActiveCategory] = useState("Computer/IT");
  const [categoryId, setCategoryId] = useState<number | null>(null);


  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(fetchCourses())
  }, [dispatch]);

  useEffect(() => {
    const currentCategory = categories?.find(
      (category) => category.name === activeCategory
    );
    if (currentCategory) {
      setCategoryId(currentCategory.id);
    }
  }, [activeCategory,categories]);

  const navItems = categories?.map((category) => ({
    name: category.name,
    slug: `/${category.name}`,
    categoryId: category.id,
  }));

  const products = useMemo(
    () => courses
      .filter(course => course.categoryId === categoryId)
      .map(course => ({
        id: course.id,
        description: course.description,
        name: course.title || "Data Analyst Master Course",
        href: `/product-detail/${course.id}`,
        imageSrc: course.imageUrl || "https://learn.g2.com/hs-fs/hubfs/Screen%20Shot%202020-01-24%20at%208.01.03%20AM.png",
        discountPrice: course.price,
        originalPrice: 1000,
      })),
    [categoryId,courses]
  );

  const popularCourses = useMemo(
    () => courses
      .filter(course => course.price > 200)
      .map(course => ({
        id: course.id,
        description: course.description,
        name: course.title || "Data Analyst Master Course",
        href: `/product-detail/${course.id}`,
        imageSrc: course.imageUrl || "https://learn.g2.com/hs-fs/hubfs/Screen%20Shot%202020-01-24%20at%208.01.03%20AM.png",
        discountPrice: course.price,
        originalPrice: 1000,
      })),
    [courses]
  );

  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: `url('https://paarshelearning.com/assets/image/bg-front-1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-1/2  px-6 sm:px-10 lg:px-40 text-center text-white">
          <p className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Education is the door to the future & Paarsh Edu is the key to a Bright
            future
          </p>
        </div>
      </div>

      {/* carosel navItems */}
      <Container>
        <h1 className=" sm:text-5xl text-3xl font-semibold py-10">Top rated Courses</h1>
        <Carousel
          opts={{
            align: "start"
          }}
          className="w-5/6 mt-8"
        >
          <CarouselContent className="px-2">
            {navItems?.map((category, index) => (
              <div key={index} className="">
                {categoryStatus === 'succeeded' ? 
                 <Card
                 onClick={() => {
                   setActiveCategory(category.name);
                 }}
                 className={`flex mx-2 w-max text-white justify-center text-center bg-blue-950 text-2xl font-bold duration-200 cursor-pointer ${activeCategory === category.name
                   ? "underline underline-offset-2"
                   : ""
                   }  rounded p-1 px-2 overflow-hidden text-ellipsis whitespace-nowrap shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}
               >
                 {category?.name}
               </Card> : <Skeleton className="h-6 w-full" />}

              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>

        {/* Tope Rated */}
        <CarouselSize products={products} role="topRated" status={courseStatus} error={courseError}></CarouselSize>

        {/* Popular courses  */}
        <h1 className=" sm:text-5xl text-3xl font-semibold py-10">Popular Courses</h1>
        <CarouselSize products={popularCourses} role="popular" status={courseStatus} error={courseError}></CarouselSize>

        {/* how we works */}
        <h1 className=" sm:text-5xl text-3xl font-semibold mt-10">How We Works</h1>
        <div className="mb-20 mt-10 w-full gap-10 flex flex-col sm:flex-row items-center justify-center ">
            <iframe
              className="rounded-lg  sm:w-2/5"
              height="315"
              src="https://www.youtube.com/embed/eWt29v2KoFY"
              title="How We Work"
              allowFullScreen
            ></iframe>
            <iframe
              
              className="rounded-lg sm:w-2/5"
              height="315"
              src="https://www.youtube.com/embed/eWt29v2KoFY"
              title="How We Work"
              allowFullScreen
            ></iframe>
          
        </div>
      </Container>

      {/* why choose paarsh */}
      <div
        className=" py-16 bg-cover flex flex-col items-center"
        style={{
          backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1400/0*eQ2hqteHW10wEVhK')`,
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <Container>
          <h1 className="text-4xl mb-6 font-bold text-center text-gray-950">
            Why choose Paarsh <span className="text-blue-800">EDU Learning</span>
          </h1>
          <div className="grid sm:grid-cols-2 gap-10 my-6 w-full">
            {benefits.map((benefit, index) => (
              <BenefitsCard key={index} title={benefit.title} />
            ))}
          </div>
        </Container>
      </div>

      {/* our benefits */}
      <Container>
        <div className="sm:flex justify-between px-10 sm:px-36 my-32 items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl mb-6">
              Our Benefits
            </h1>
            <ul>
              <li className="my-8 text-xl font-semibold flex items-center gap-2">
                <LucideCheck className="text-blue-600 font-bold" />
                Deliver quality education to your learners
              </li>
              <li className="my-8 text-xl font-semibold flex items-center gap-2 ">
                <LucideCheck className="text-blue-600 font-bold" />
                Manage the courses our learners study
              </li>
              <li className="my-8 text-xl font-semibold flex items-center gap-2 ">
                <LucideCheck className="text-blue-600 font-bold" />
                Provide video, documents, or external links
              </li>
              <li className="my-8 text-xl font-semibold flex items-center gap-2 ">
                <LucideCheck className="text-blue-600 font-bold" />
                Automatically add completion certificates
              </li>
              <li className="my-8 text-xl font-semibold flex items-center gap-2 ">
                <LucideCheck className="text-blue-600 font-bold" />
                Customize our flexible pricing plans
              </li>
            </ul>
          </div>
          <div className=" sm:w-1/2 ">
            <img
              src="https://paarshelearning.com/assets/image/oubenefits.jpg"
              alt="Benefits"
              className="w-full h-auto object-cover rounded-br-3xl dark:opacity-90 rounded-tl-3xl"
            />
          </div>
        </div>
      </Container>

      {/* Strategies for Students */}
      <div
        className=" bg-neutral-100"
        style={{
          backgroundImage: `url('https://paarshelearning.com/assets/image/bg-front-1.jpg')`,
          backgroundAttachment: "fixed",
        }}
      >
        <Container>
          <h1 className="text-white font-bold text-3xl sm:text-5xl text-center mb-10 mt-20">
            Strategies for Students
          </h1>
          <div className="grid w-full px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-16 ">
            {strategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                title={strategy.title}
                content={strategy.content}
              />
            ))}
          </div>
        </Container>

      </div>        

      {/* Our Achievements */}
      <Container >
        <div className="mt-10 mb-10 items-center justify-center">
          <div className="flex flex-col items-center p-10">
            <h1 className=" text-center font-bold text-4xl sm:text-5xl py-4">
              Our Achievements
            </h1>
            <p className="font-semibold text-justify text-xl ">
              Paarsh E-EDU is a start-up based Edutech company from Pune,
              Nashik, & Surat. We provide courses for every student willing to
              start their career in their respective field. Paarsh E-EDU has
              trained 100+ industry ready candidates in the IT and Non-IT sectors.
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home