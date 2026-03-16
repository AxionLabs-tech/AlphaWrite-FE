import Image from "next/image";

const detectors = [
  {
    name: "turnitin",
    icon: "/logos/turnitin.png",
    color: "text-[#2196F3]",
  },
  {
    name: "Copyleaks",
    icon: "/logos/copyleaks.png",
    color: "text-slate-800",
  },
  {
    name: "ZeroGPT",
    icon: "/logos/zerogpt.png",
    color: "text-slate-800",
  },
  {
    name: "QuillBot",
    icon: "/logos/quillbot.png",
    color: "text-[#2e9c5a]",
  },
  {
    name: "grammarly",
    icon: "/logos/grammarly.png",
    color: "text-slate-800",
  },
  {
    name: "GPTZero",
    icon: "/logos/gptzero.png",
    color: "text-[#3b82f6]",
  },
];

export default function BypassDetectors() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Bypass AI content detectors
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
          {detectors.map((d) => (
            <div
              key={d.name}
              className="flex items-center gap-2"
            >
              <Image
                src={d.icon}
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
              />
              <span className={`text-lg font-semibold tracking-tight sm:text-xl ${d.color}`}>
                {d.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
