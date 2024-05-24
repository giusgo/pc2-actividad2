"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";

import { Create } from "./Create";
import { Update } from "./Update";
import { Delete } from "./Delete";

export default function Panel() {
    const [btnsDisabled, setBtnsDisabled] = useState<boolean>(false);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Carousel className="w-full max-w-3xl">
                <CarouselContent>
                    <CarouselItem key={1}>
                        <div className="p-1">
                            <Create btnsDisabled={btnsDisabled} setBtnsDisabled={setBtnsDisabled}/>
                        </div>
                    </CarouselItem>
                    <CarouselItem key={2}>
                        <div className="p-1">
                            <Update btnsDisabled={btnsDisabled} setBtnsDisabled={setBtnsDisabled}/>
                        </div>
                    </CarouselItem>
                    <CarouselItem key={3}>
                        <div className="p-1">
                            <Delete btnsDisabled={btnsDisabled} setBtnsDisabled={setBtnsDisabled}/>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}