import React from 'react'
import Playlistlist from '../list/Playlist-list'

export default function Allplaylist() {
  const userId = "e11ca899-6463-4706-90ff-63135fc4b6dd";
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJvYXV0aDItc2VydmljZS12MiIsInN1YiI6ImUxMWNhODk5LTY0NjMtNDcwNi05MGZmLTYzMTM1ZmM0YjZkZCIsImV4cCI6MTc1Nzk5MTUyOSwiaWF0IjoxNzU3OTg3OTI5LCJlbWFpbCI6ImF2ZXRhaTJrM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.OVGRa9nKBQyChG_lADTs1huOQ_5wAfJm0uMe7xxOBv8ni6mpHhH1iUWMEhtTzN2hm4IXGJ_mGtTPh3WzqEO4q95JxB8e6QLq7qUIGYmmDdoch80Ma-2X4PLkayc4H5MVVSlRw6nI32WGLmN4mDDGNgfP8XflgVewWfoMUojnfjx7qYbZghgd7-3ZIsIDu7_610wzhOqucvQXRVMHO-vkvcHLpNJAg0htSGT1wnfxN2Ji2G2lApJqQmer432Uu1NQPKpBkkzfXXyf4RoiS_vLKRPUdRDbF0C6TCAOYu9N50pyxhp7ET3HOlTBKuYrbegtJOAJF1IVYec90iBfp1yAEQ"
    
  return (
    <div>
      <Playlistlist userId={userId} token= {token}/>
    </div>
  )
}

