import Categories from "../Category/Category";
import ExtraSection from "../../pages/ExtraSection/ExtraSection";
import Banner from "../Banner/Banner";

export default function Home() {
    return (
        <div className="bg-amber-100">
            <Banner></Banner>
            <Categories />
            <ExtraSection />
        </div>
    );
}
