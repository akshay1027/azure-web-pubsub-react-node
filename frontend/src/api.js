const fetchUrl = async () => {
    const id = 'Akshay';
    let res = await fetch(`/negotiate?id=${id}`);
    let data = await res.json();

    return data.url;
}

export default fetchUrl;