/**const btn = document.getElementById('setter')
const filePathElement = document.getElementById('port-list')

btn.addEventListener('click', async () => {
    window.api.receive("fromMain", (data) => {
        console.log(`Received ${data} from main process`);
    });
    window.api.send("toMain", "some data");
})*/