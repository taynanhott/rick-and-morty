export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <img
                src="image/portal.png"
                alt="portal"
                className="spin"
            />
        </div>
    )
}