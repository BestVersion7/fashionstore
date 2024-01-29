export default async function App() {
    return (
        <main>
            <div className="flex">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-green-200">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="w-40 bg-yellow-300">
                            hellohellohello
                        </div>
                    ))}
                </div>
                <aside>KLFJDSKJ</aside>
            </div>
        </main>
    );
}
