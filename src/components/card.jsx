export default function Card({ character }) {
    return (
        <div key={character.id} className="bg-gray-800 rounded-lg p-4 card h-72 ">
            <img
                src={character.image}
                alt={character.name}
                className="rounded-lg w-full mb-4"
            />
            <div className="card-content">

                <h2 className="text-lg font-semibold bg-black/60 px-2 border border-transparent rounded-full">{character.name}</h2>
                <p className="text-sm">
                    <span className="font-medium block">Status: {character.status}</span>
                    <span className="font-medium block">Species: {character.species}</span>
                    <span className="font-medium block">Location: {character.location.name}</span>
                    <span className="font-medium block">Episodes: {character.episode.length}</span>
                </p>
            </div>
        </div>
    )
}