module.exports = [
    {
        name: 'count',
        callback: (data: string, cb: (data: string) => void) => {
            console.log("received web count :" + data);
            toast(data);
            alert(data);
            cb(Date.now().toString());
        }
    }
]