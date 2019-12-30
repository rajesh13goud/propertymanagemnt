 const ocrRes = (req, res) =>{
    console.log("fetching data");
    Assets.findById(req.params.assetId, (err, asset) => {
        if (err || !asset) {
            console.log(err);
            let response = {
                status: 'Failed',
            }
            return res.json(response);
        }
        console.log("its inside :" + asset);
        var inv;
        loop:
        for (let i = 0; i < asset.invoices.length; i++) {
            if (asset.invoices[i].ocr_status == false) {
                inv = asset.invoices[i];
                console.log(inv);
                asset.invoices[i].ocr_status = true;
                asset.save();
                break loop;
            }
        }
        let response = {
            status: 'Success',
            asset: asset,
            invoice: inv
        }
        console.log(response);
        return res.json(response)
    })
}

module.exports = {
    ocrRes: ocrRes
}