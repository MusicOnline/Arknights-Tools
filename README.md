# Arknights-Tools

A collection of datamining tools for the mobile game Arknights.

## Issues

- Applying sprite atlas alpha masks and unstiching them (how?)

## Prerequsites

Node.js >= 14.15.0

## Installation

1. Download or clone this repository.
2. In the top level directory, run `npm i` to install dependencies.

## Usage

### Apply alpha mask:

`npm run alpha -- /path/to/Texture2D /optional/path/to/output`

## Retrieving Game Assets

1. Download and install an Android emulator such as [Bluestacks 5](https://www.bluestacks.com/bluestacks-5.html) which allows you to access, import and export files. An actual Android device may work as well.
2. Download and install the game from the Google Play Store or [Bilibili](https://www.biligame.com/detail/?id=101772) for the Mainland Chinese version (click on 下载安卓端到电脑 to download the APK file).
3. Open the game and install additional resources.
4. If on an emulator, open the file manager and export `/Android/obb/com.YoStarEN.Arknights/main.79.com.YoStarEn.Arknights.obb` to your computer for EN/JP/KR clients (adapt accordingly). For the Mainland Chinese client, download an archive manager such as [ZArchiver](https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver) to first zip `/Android/data/com.hypergryph.arknights.bilibili`, then export the archive to your computer. Otherwise, transfer the obb/data from the Android device to your computer. Extract the obb/zip files if any.
5. Download, extract, then run [AssetStudioGUI](https://github.com/Perfare/AssetStudio/releases). In the menu, select File > Load Folder, then select the extracted folder or a subfolder containing the files you want. Memory usage increases with the number of files loaded.
6. In the menu, select Filter Type > Texture2D and/or Sprite. Then, swtich to the Asset List tab.
7. Select the files to be extracted, then right click > Export selected assets.

Check both `/Android/obb` and `/Android/data` for any additional hotfix/patch files which are not together with the majority of assets.

Directories of interest:

- `chararts` (Operator default splash images and chibis)
- `charpack` (EN/JP/KR, Operator default splash images and chibis)
- `skinpack` (Operator outfit splash images and chibis)
- `spritepack/skill_icons_h2_0.ab` (Skill icons)
- `spritepack/ui_brand_image_hub_h1_0.ab` (Outfit brand logos)
- `spritepack/ui_camp_logo_h2_0.ab` (Faction logos)
- `spritepack/ui_camp_logo_h2_linkage_0.ab` (Collab faction logos)
