# リニューアルする
- [参考](https://rikky0611.github.io/)

# ディレクトリ構成
```
📦ko-watanabe.github.io
 ┣ 📂.git
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜applypatch-msg.sample
 ┃ ┃ ┣ 📜commit-msg.sample
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample
 ┃ ┃ ┣ 📜post-update.sample
 ┃ ┃ ┣ 📜pre-applypatch.sample
 ┃ ┃ ┣ 📜pre-commit.sample
 ┃ ┃ ┣ 📜pre-merge-commit.sample
 ┃ ┃ ┣ 📜pre-push.sample
 ┃ ┃ ┣ 📜pre-rebase.sample
 ┃ ┃ ┣ 📜pre-receive.sample
 ┃ ┃ ┣ 📜prepare-commit-msg.sample
 ┃ ┃ ┗ 📜update.sample
 ┃ ┣ 📂info
 ┃ ┃ ┗ 📜exclude
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂refs
 ┃ ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┃ ┗ 📜master
 ┃ ┃ ┃ ┗ 📂remotes
 ┃ ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┃ ┗ 📜master
 ┃ ┃ ┗ 📜HEAD
 ┃ ┣ 📂objects
 ┃ ┃ ┣ 📂00
 ┃ ┃ ┃ ┗ 📜95fbb1cf237d9741174038e8a0e858cb7f4aff
 ┃ ┃ ┣ 📂07
 ┃ ┃ ┃ ┗ 📜0bdb300892d4570d04963ad28d48767ae35c4a
 ┃ ┃ ┣ 📂09
 ┃ ┃ ┃ ┗ 📜9b7ed9dff699d83fa1e028ccde53e22e4115c4
 ┃ ┃ ┣ 📂0d
 ┃ ┃ ┃ ┗ 📜0438450c3ca4b1bff867e1280c3fc42134a2b4
 ┃ ┃ ┣ 📂0f
 ┃ ┃ ┃ ┗ 📜297fcce7f1d5d89106406294d22c5dff90fb99
 ┃ ┃ ┣ 📂11
 ┃ ┃ ┃ ┗ 📜d0a71935079d73a9f54e52707b2a38566fb10f
 ┃ ┃ ┣ 📂13
 ┃ ┃ ┃ ┗ 📜89f80908c58db3241a5efd35db75eecce25f89
 ┃ ┃ ┣ 📂16
 ┃ ┃ ┃ ┗ 📜1801e97ac3adc68a5f4e89c8e21240cda50dc1
 ┃ ┃ ┣ 📂19
 ┃ ┃ ┃ ┗ 📜45cb4991bab51df25a44c3ab4ad166039f5617
 ┃ ┃ ┣ 📂1b
 ┃ ┃ ┃ ┗ 📜257482ab19497649c6b97641399290dbb72554
 ┃ ┃ ┣ 📂1d
 ┃ ┃ ┃ ┣ 📜23385edce1056ae14f8b19e76bdddca3a6d720
 ┃ ┃ ┃ ┗ 📜9102a5f8355a2cf2bdad4d5e4b155892a35fd2
 ┃ ┃ ┣ 📂1e
 ┃ ┃ ┃ ┗ 📜370ff1362dc2943848dce4898c6c5e48285e02
 ┃ ┃ ┣ 📂22
 ┃ ┃ ┃ ┣ 📜03c9cef2864c54e684429f39ac5594415a8f32
 ┃ ┃ ┃ ┗ 📜18a2ed428b5a53963f0554336a7411c260261b
 ┃ ┃ ┣ 📂25
 ┃ ┃ ┃ ┣ 📜8d3798b1353ddb3c791128c64f5637ecf246a5
 ┃ ┃ ┃ ┗ 📜9d6f57421ea684a140d4ef55d022669fe17448
 ┃ ┃ ┣ 📂27
 ┃ ┃ ┃ ┗ 📜912b0c04766bdb12149fd71c08503f1f208c5e
 ┃ ┃ ┣ 📂29
 ┃ ┃ ┃ ┗ 📜9601bf7913e169e55ef2d46216fd3e876c9aae
 ┃ ┃ ┣ 📂2a
 ┃ ┃ ┃ ┗ 📜809082fd87f9d5dbf4a2ab9518f4d61ed9d3e0
 ┃ ┃ ┣ 📂2d
 ┃ ┃ ┃ ┣ 📜6bc8b19b432452e90387b1f6b894f77482305f
 ┃ ┃ ┃ ┗ 📜da7fa2faa4f8fd4153d854806b756e8cb88cbc
 ┃ ┃ ┣ 📂2e
 ┃ ┃ ┃ ┗ 📜0dfa72c70d3ffdae6912003cc4b224d4e679c1
 ┃ ┃ ┣ 📂31
 ┃ ┃ ┃ ┗ 📜586705663960b80045353334eb7c4f1a13271a
 ┃ ┃ ┣ 📂32
 ┃ ┃ ┃ ┗ 📜09c0d58482ca11f2a3f91be3ecff67c12e614a
 ┃ ┃ ┣ 📂36
 ┃ ┃ ┃ ┗ 📜da268dce895c16fcaaef32a73732113335b63b
 ┃ ┃ ┣ 📂3b
 ┃ ┃ ┃ ┗ 📜76cb0935876aba3b6fc3640649bf914d77ca12
 ┃ ┃ ┣ 📂45
 ┃ ┃ ┃ ┣ 📜48b34785e0906a8737027b5f14278ce3620c6d
 ┃ ┃ ┃ ┣ 📜acf8139a61f15033bc3a5813c53a461b0e1188
 ┃ ┃ ┃ ┗ 📜e948ef16b8d194982b305562dc2db83b951d93
 ┃ ┃ ┣ 📂46
 ┃ ┃ ┃ ┗ 📜312603df10831e5770e2e807179d0136a0184e
 ┃ ┃ ┣ 📂47
 ┃ ┃ ┃ ┗ 📜3ccf5afc4f3923986ad2a289c59087905cab80
 ┃ ┃ ┣ 📂49
 ┃ ┃ ┃ ┗ 📜776d865e75e35dad58547253835224697cd2d2
 ┃ ┃ ┣ 📂4d
 ┃ ┃ ┃ ┣ 📜5814f926497c813f35d1cfd669fde33b7f0bee
 ┃ ┃ ┃ ┗ 📜9054e78a472a125c484e2e1e15cbb53b6e4fea
 ┃ ┃ ┣ 📂50
 ┃ ┃ ┃ ┗ 📜bc3e38f3056b8a0ff529c7fe00cbec3e205f2d
 ┃ ┃ ┣ 📂51
 ┃ ┃ ┃ ┗ 📜63abd12f8e030e6375119a28add3d77de7b43a
 ┃ ┃ ┣ 📂53
 ┃ ┃ ┃ ┗ 📜64d4ab667663b8e203cd915833c5d14dedd5ca
 ┃ ┃ ┣ 📂56
 ┃ ┃ ┃ ┗ 📜1342ee2583b7ade21a9612d283dce75c22a0d7
 ┃ ┃ ┣ 📂57
 ┃ ┃ ┃ ┗ 📜beb5239fc96bbcec2156902b09d441367a5177
 ┃ ┃ ┣ 📂5a
 ┃ ┃ ┃ ┗ 📜707afc5224ffd93dd03abaedf5cfd5e047e5c0
 ┃ ┃ ┣ 📂5f
 ┃ ┃ ┃ ┗ 📜4ad453dd511c6d96b2798cc9d6d070437271d8
 ┃ ┃ ┣ 📂61
 ┃ ┃ ┃ ┗ 📜7d65a503456c5c3e588ee792b5adfd9c4edf3d
 ┃ ┃ ┣ 📂67
 ┃ ┃ ┃ ┗ 📜4766b5aa76b40176eb1b765fedee4827680996
 ┃ ┃ ┣ 📂68
 ┃ ┃ ┃ ┗ 📜0017900701f47185a1b645d130a396ef5428f3
 ┃ ┃ ┣ 📂6b
 ┃ ┃ ┃ ┗ 📜15f62990be7215c499ecf3c5b261ed11c7d36f
 ┃ ┃ ┣ 📂6f
 ┃ ┃ ┃ ┗ 📜59cf31c64c487b8c0982ef2414a4ab0b05addf
 ┃ ┃ ┣ 📂71
 ┃ ┃ ┃ ┗ 📜695dd012571ffde4ab807fc8b629bd1377db2e
 ┃ ┃ ┣ 📂78
 ┃ ┃ ┃ ┗ 📜7911e0e4280535e87444297d8187bce26933ba
 ┃ ┃ ┣ 📂79
 ┃ ┃ ┃ ┗ 📜a017abfa0d4408c2f024450363ecfc571ba0fd
 ┃ ┃ ┣ 📂7a
 ┃ ┃ ┃ ┣ 📜24b77a842359e80411d9ac09bc9850311278d4
 ┃ ┃ ┃ ┗ 📜9d92df44310c87f6c2ede1c637bf32024d9581
 ┃ ┃ ┣ 📂7c
 ┃ ┃ ┃ ┗ 📜a679724cc3f965796a3f532811a99758c508ce
 ┃ ┃ ┣ 📂80
 ┃ ┃ ┃ ┗ 📜2a134d5590bb35ec7a4f3a6125f57006f608df
 ┃ ┃ ┣ 📂81
 ┃ ┃ ┃ ┣ 📜5626cb376de19acfb9fc15d7bcef18f82a4f5b
 ┃ ┃ ┃ ┗ 📜66f80dbdecffe9b42134aa2e509cd5c5c264a5
 ┃ ┃ ┣ 📂83
 ┃ ┃ ┃ ┗ 📜c9be7ff94fb705d3d1532d40e757a05429ca99
 ┃ ┃ ┣ 📂84
 ┃ ┃ ┃ ┣ 📜a07b0cee487152df57c50797f1aac4af680bc6
 ┃ ┃ ┃ ┗ 📜b80820c885f16afda1d64751a2a4e5a6335ab3
 ┃ ┃ ┣ 📂86
 ┃ ┃ ┃ ┗ 📜31c18f4f7651900e0b5162469af25b0ce2e128
 ┃ ┃ ┣ 📂93
 ┃ ┃ ┃ ┣ 📜031bf5f4cfee9365b029ac896261f03c35c1be
 ┃ ┃ ┃ ┗ 📜b29bbce9fd5c7f6a387869498814139111e005
 ┃ ┃ ┣ 📂96
 ┃ ┃ ┃ ┗ 📜552306d2a448d7bdc9bef7986c9ff0d6e667df
 ┃ ┃ ┣ 📂9a
 ┃ ┃ ┃ ┣ 📜50c8f031586e92b43561187db1459c2b038696
 ┃ ┃ ┃ ┗ 📜5df1311bf6f49dcce2b056f503b9c73a305387
 ┃ ┃ ┣ 📂9b
 ┃ ┃ ┃ ┗ 📜afa65b0b6951eaba8742c4a0332cd2e1115961
 ┃ ┃ ┣ 📂9e
 ┃ ┃ ┃ ┗ 📜10f45db915e4e1ce1609b9789432081e9d273d
 ┃ ┃ ┣ 📂a0
 ┃ ┃ ┃ ┣ 📜1b37646dcbb63bab77f37e91cd679ba0b413c1
 ┃ ┃ ┃ ┗ 📜394a9c33e877e205d569a1284e9a619e813c81
 ┃ ┃ ┣ 📂a3
 ┃ ┃ ┃ ┗ 📜d7023077541f773d0e504c8c1f9fc21f0fa18c
 ┃ ┃ ┣ 📂a7
 ┃ ┃ ┃ ┗ 📜26fbbc2315a41b08e395cec226e3302b92f720
 ┃ ┃ ┣ 📂a9
 ┃ ┃ ┃ ┗ 📜f8ae9220829446628d80f4be6b0c026b4de07e
 ┃ ┃ ┣ 📂ad
 ┃ ┃ ┃ ┗ 📜851dc0aa039a21b1b05f772554d0b192fa77e3
 ┃ ┃ ┣ 📂af
 ┃ ┃ ┃ ┗ 📜de930be96cb6ece51906e7397460f426fadbb5
 ┃ ┃ ┣ 📂b0
 ┃ ┃ ┃ ┗ 📜da96b00110fa138be93f42802e1228fa8031de
 ┃ ┃ ┣ 📂b2
 ┃ ┃ ┃ ┗ 📜3b5c9e159a2f66a13f70df424e1fa832b71591
 ┃ ┃ ┣ 📂be
 ┃ ┃ ┃ ┗ 📜258970bd621dfcf4f29ef2bfddb2523c7c97f7
 ┃ ┃ ┣ 📂c4
 ┃ ┃ ┃ ┗ 📜bb661782b1fe71269a537c6d2b864890c7385a
 ┃ ┃ ┣ 📂c5
 ┃ ┃ ┃ ┗ 📜cf7b48b6034aa3ec7c8ffe3b47f42fee246890
 ┃ ┃ ┣ 📂ca
 ┃ ┃ ┃ ┣ 📜4f86dcdef79540e8eb6f003821c326b43a866c
 ┃ ┃ ┃ ┗ 📜90cca13207823294a4967a762b4e5e2647115e
 ┃ ┃ ┣ 📂cb
 ┃ ┃ ┃ ┗ 📜cb5053f2de7d5e2f9ee952093f0736a877dfe9
 ┃ ┃ ┣ 📂cd
 ┃ ┃ ┃ ┗ 📜5bfb7083cb6cc160c7758bc5ab312287d1198c
 ┃ ┃ ┣ 📂ce
 ┃ ┃ ┃ ┗ 📜5f05042d4f5d73de84b446ac03a35291b57b72
 ┃ ┃ ┣ 📂cf
 ┃ ┃ ┃ ┗ 📜3244b84ea4bee5aad544df7c56494cfdfef1b1
 ┃ ┃ ┣ 📂da
 ┃ ┃ ┃ ┣ 📜055df9422fcb20a080a9c72d7b633927bac45f
 ┃ ┃ ┃ ┗ 📜5811730af480ef3eff1de9810f2e5726c62272
 ┃ ┃ ┣ 📂df
 ┃ ┃ ┃ ┗ 📜d7b9917acbb229700226c829766a37eaded2d1
 ┃ ┃ ┣ 📂e0
 ┃ ┃ ┃ ┗ 📜fef0af444d3ad314262ab12050335e597930ea
 ┃ ┃ ┣ 📂e1
 ┃ ┃ ┃ ┗ 📜770f1a87116b23a52a3c3ecdaf133ef10d741e
 ┃ ┃ ┣ 📂e4
 ┃ ┃ ┃ ┗ 📜4487823e7d6d008ce3ad2fb767ea258c419c0f
 ┃ ┃ ┣ 📂e6
 ┃ ┃ ┃ ┗ 📜055cfa585e88def28dee06ab775ee57a7a6bde
 ┃ ┃ ┣ 📂e7
 ┃ ┃ ┃ ┗ 📜40e3b8ba726353817a746fa5d821f7c6043977
 ┃ ┃ ┣ 📂e8
 ┃ ┃ ┃ ┗ 📜7b2c4372c40c0b2795da911807a825c2775464
 ┃ ┃ ┣ 📂eb
 ┃ ┃ ┃ ┗ 📜986a01d835db3a6be6dd917041e43ad3242483
 ┃ ┃ ┣ 📂ee
 ┃ ┃ ┃ ┣ 📜3593b81cf7c3b3d967e2201d5cf1ee9931af7f
 ┃ ┃ ┃ ┗ 📜ffc47175215053cd594d1cb0a433a6e0125a65
 ┃ ┃ ┣ 📂f0
 ┃ ┃ ┃ ┣ 📜71b0322369683d796170805b1931f5dbbb8f04
 ┃ ┃ ┃ ┣ 📜97b7f22dfb1c6a2fbae0a36570f4f9af3a9fbb
 ┃ ┃ ┃ ┗ 📜da96a42a8853c56d88ffcbf14bc52c54435813
 ┃ ┃ ┣ 📂f4
 ┃ ┃ ┃ ┣ 📜3052ff0d02927c1de6fef4b5004f49ba2aebcb
 ┃ ┃ ┃ ┗ 📜6d34f76d4790c1ab5e7d21ca9abb1e84a46df2
 ┃ ┃ ┣ 📂fa
 ┃ ┃ ┃ ┗ 📜87161773bef20acccec866386aa5863c068123
 ┃ ┃ ┣ 📂fd
 ┃ ┃ ┃ ┗ 📜5c68e0a621e4e705b2944f72f435948e93b3ba
 ┃ ┃ ┣ 📂fe
 ┃ ┃ ┃ ┗ 📜53984025a4e85243e4333a3fa857a256491338
 ┃ ┃ ┣ 📂ff
 ┃ ┃ ┃ ┗ 📜7b4060098140826941e1ed5a59a8b27d1a5419
 ┃ ┃ ┣ 📂info
 ┃ ┃ ┗ 📂pack
 ┃ ┃ ┃ ┣ 📜pack-94c8a4b377c41c6980c197b232c1bfbb2422d952.idx
 ┃ ┃ ┃ ┗ 📜pack-94c8a4b377c41c6980c197b232c1bfbb2422d952.pack
 ┃ ┣ 📂refs
 ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┗ 📜master
 ┃ ┃ ┣ 📂remotes
 ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┗ 📜master
 ┃ ┃ ┗ 📂tags
 ┃ ┣ 📜COMMIT_EDITMSG
 ┃ ┣ 📜FETCH_HEAD
 ┃ ┣ 📜HEAD
 ┃ ┣ 📜config
 ┃ ┣ 📜description
 ┃ ┗ 📜index
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜font-awesome.min.css
 ┃ ┃ ┗ 📜main.css
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜FontAwesome.otf
 ┃ ┃ ┣ 📜fontawesome-webfont.eot
 ┃ ┃ ┣ 📜fontawesome-webfont.svg
 ┃ ┃ ┣ 📜fontawesome-webfont.ttf
 ┃ ┃ ┣ 📜fontawesome-webfont.woff
 ┃ ┃ ┗ 📜fontawesome-webfont.woff2
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📜image_loader.js
 ┃ ┃ ┣ 📜jquery.min.js
 ┃ ┃ ┣ 📜jquery.poptrox.min.js
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┗ 📜skel.min.js
 ┃ ┗ 📜.DS_Store
 ┣ 📂img
 ┃ ┣ 📂fulls
 ┃ ┃ ┣ 📜01.jpg
 ┃ ┃ ┣ 📜02.jpg
 ┃ ┃ ┣ 📜03.jpg
 ┃ ┃ ┣ 📜04.jpg
 ┃ ┃ ┣ 📜05.jpg
 ┃ ┃ ┣ 📜06.jpg
 ┃ ┃ ┗ 📜07.jpg
 ┃ ┣ 📂thumbs
 ┃ ┃ ┣ 📜01.jpg
 ┃ ┃ ┣ 📜02.jpg
 ┃ ┃ ┣ 📜03.jpg
 ┃ ┃ ┣ 📜04.jpg
 ┃ ┃ ┣ 📜05.jpg
 ┃ ┃ ┣ 📜06.jpg
 ┃ ┃ ┗ 📜07.jpg
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜avatar_desktop.jpg
 ┃ ┗ 📜bg.jpg
 ┣ 📂jp
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜index.html
 ┣ 📜.DS_Store
 ┣ 📜LICENSE.txt
 ┣ 📜README.md
 ┣ 📜image_sender.html
 ┗ 📜index.html
 ```