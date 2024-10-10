import { useEffect, useState } from "react";
import { fetchUpdateWord, fetchWord } from "./services";

function Word({ setError, setLoading }) {
    const [word, setWord] = useState("");
    const [tempWord, setTempWord] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { word: updatedWord } = await fetchUpdateWord(tempWord);
            setWord(updatedWord);
            setError('');
        } catch (err) {
            setError(err?.error || "ERROR");
        } finally {
            setLoading(false);
        }
        setTempWord("");
    };

    useEffect(() => {
        const initFetch = async () => {
            setLoading(true);
            try {
                const { word: fetchedWord } = await fetchWord();
                setWord(fetchedWord);
                setError('');
            } catch (err) {
                setError(err?.error || 'ERROR');
            } finally {
                setLoading(false);
            }
        };
        initFetch();
    }, [setError, setLoading]);

    return (
        <div className="word">
            <h2>Stored word</h2>
            {!!word ? <p>Your stored word is: {word}</p> : <p>You do not have a stored word yet.</p>}
            <form className="word-form" onSubmit={submitHandler}>
                <label className="form-label">
                    <span>Update stored word: </span>
                    <input
                        className="form-input"
                        value={tempWord}
                        onChange={(e) => setTempWord(e.target.value)}
                    />
                </label>
                <button type="submit" className="form-btn">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Word;
