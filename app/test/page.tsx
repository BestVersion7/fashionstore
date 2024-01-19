import { AccountHover } from "../components/AccountHover";

export default async function TestPage() {
    return (
        <main>
            <div className="dropdown relative">
                <span className="border-solid border-2">Hover me:</span>
                <AccountHover />
            </div>
        </main>
    );
}
