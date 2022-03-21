import React, { useEffect } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//这里的Nprogress就是一个进度条可以显示进度
const useLoadingComponent = () => {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])

    return <div />
}

export default (loader, loading = useLoadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}
