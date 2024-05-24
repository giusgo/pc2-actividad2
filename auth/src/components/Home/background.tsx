import backgroundImage from "@/../public/bg.jpg";

export default function Background() {
    return <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat fixed z-[-10]"
        style={{
            backgroundImage: `url(${backgroundImage.src})`,
            filter: 'blur(10px)',
        }}
    >
    </div>
}