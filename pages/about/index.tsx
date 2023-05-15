import LinkButton from "@/components/linkButton";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-6">
      <h1 className="font-extrabold text-5xl"> About this project </h1>
      <p
        className="text-center text-gray-400 text-lg mt-4"
        style={{ maxWidth: "40%" }}
      >
        {" "}
        This is just a demo project and not fully functional. With this project,
        i wanted to learn different webdev technologies. For the frontend i used
        Next.js with Typescript and TailwindCSS. Authentication was handled with
        NextAuth and a MySql database. The backend i used a Node.js server with
        Express and a MySql database. To get the data from Steam i used the
        Steam API. The data for the game keys are scraped from different key
        sites with puppeteer. Unfortunately, without paid Proxy Servers, there
        is no reliable way to scrape a lot of data from the key sites. For that
        reaseon, i had to shrink the scope of the project and make it a proof of
        concept demo project. However, i still learned a lot and had fun
        building. I deployed the project on Vercel and Redner, the database on
        Planetscale. I might expand this project again in the future, but for
        know i dont know how to get large amounts of data for the game keys
        without spending money.
      </p>
      <h2 className="font-bold text-2xl"> Checkout the project on GitHub </h2>
      <div className="flex justify-between items-baseline gap-5">
        <LinkButton
          text={"Frontend"}
          href={"https://github.com/JnsWnk/steamsales"}
        ></LinkButton>
        <LinkButton
          text={"Backend"}
          href={"https://github.com/JnsWnk/steamsales-node"}
        ></LinkButton>
      </div>
    </div>
  );
};

export default About;
