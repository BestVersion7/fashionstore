"use client";

export const Modal = (props: {
    height: number;
    width: number;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={`h-${props.height} w-${props.width} fixed px-3 flex flex-col justify-center inset-0 m-auto z-10 bg-violet-100  shadow-xl rounded-md`}
        >
            {props.children}
        </div>
    );
};
