"use client";
import { useState, useEffect } from 'react';


export default function Search() {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/images?query=${query}&page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setImages(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (query) {
            fetchImages();
        }
    }, [query, page]);

    return (
        <div>
            <h1>Image Search</h1>
            <input
                type="text"
                placeholder="Search for images"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <p>Loading images...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                    <div key={image.id} className="relative aspect-square">
                        <img 
                            src={image.urls.small} 
                            alt={image.alt_description || 'Unsplash image'}
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
