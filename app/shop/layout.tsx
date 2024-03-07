import { SearchInput } from "../components/helpers/SearchInput";

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>
            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>
            {props.children}
        </main>
    );
}
