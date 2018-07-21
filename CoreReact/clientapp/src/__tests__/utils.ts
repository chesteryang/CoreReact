export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

it('okay', () => {
    sleep(1)
})