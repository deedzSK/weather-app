import { SearchInput } from "./SearchInput.jsx";

export function SearchBarMobile({ onSearch }) {
    return (
        <div className="xl:hidden absolute top-[31px] right-[39px] z-40">
            <div className="flex flex-col h-full">
                <div className="py-2 px-1 w-full h-full flex flex-col items-center">
                    <SearchInput 
                        onSearch={onSearch} 
                        className="w-31.25 sm:w-76.25 xl:w-75"
                    />
                </div>
            </div>
        </div>
    );
}