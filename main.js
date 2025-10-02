// Menjalankan semua kode setelah halaman (termasuk CSS) selesai dimuat
window.addEventListener('load', () => {

    const beemodel = document.getElementById("beemodel");
    const sections = Array.from(document.querySelectorAll("section"));

    const shiftPosition = [0, 20, -170, -170]
    const cameraOrbits = [[30, 90], [-20,100], [-130, 60], [-30,90]]

    const sectionOffsets = sections.map(section => section.offsetTop);
    const lastsection = sectionOffsets.length - 1;

    const interpolate = (start, end, progress) => start + (end - start) * progress;
    // console.log("Posisi section yang terdeteksi:", sectionOffsets); // Cek nilainya di sini

    const Getscrollprog = scrolly => {
        
        for (let i = 0; i < lastsection; i++) {
            if (scrolly >= sectionOffsets[i] && scrolly < sectionOffsets[i + 1]) {
                return i + (scrolly - sectionOffsets[i]) / (sectionOffsets[i + 1] - sectionOffsets[i]);
            }
        }

        return lastsection;
    };

    window.addEventListener("scroll", () => {
        // Perbaikan kecil: Cukup kirim window.scrollY, bukan dua argumen
        const scrollprog = Getscrollprog(window.scrollY);
        const sectionindex = Math.floor(scrollprog)
        const sectionProgress = scrollprog - sectionindex;  

        const currentShift = interpolate(
            shiftPosition[sectionindex],
            shiftPosition[sectionindex + 1] ?? shiftPosition[sectionindex],
            sectionProgress 
        );

        const currentOrbit = cameraOrbits[sectionindex].map((val, i) =>
            interpolate(val, cameraOrbits[sectionindex + 1]?.[i] ?? val, sectionProgress)
        );

        console.log("Scroll Progress:", scrollprog);
        beemodel.style.transform = `translateX(${currentShift}%)`;
        beemodel.setAttribute("camera-orbit", `${currentOrbit[0]}deg ${currentOrbit[1]}deg`);
    });


    const images = [ 
                    { src: "Portofolio/baligivation.jpg", title: "Piagam Finalis", description: "Sertifikat ini didapat ketika masuk 10 besar dari perlombaan Ide Kreatif baligivation." }, 
                    { src: "Portofolio/HTML_COURSE.jpeg", title: "HTML Course", description: "Sertifikat ini menandai keberhasilan saya dalam menyelesaikan dan memahami seluruh rangkaian Course HTML di SoloLearn." }, 
                    { src: "Portofolio/CSS_COURSE.jpeg", title: "CSS Course", description: "Sertifikat ini menandai keberhasilan saya dalam menyelesaikan dan memahami seluruh rangkaian Course CSS di SoloLearn." },
                    { src: "Portofolio/sertif_KB01.jpeg", title: "Kelas Bagus", description: "Dengan Memiliki sertifikat Code Marathon with python dari Kelas Bagus, yang memvalidasi pemahaman fundamental dan penerapan praktis dalam pemrograman Python dan diakhiri dengan Project seputar Hand detection" },
                    { src: "Portofolio/TryDeepl0.jpeg", title: "Custom Dataset With YOLO", description: "Mengembangkan model deep learning untuk Klasifikasi Object Custom menggunakan Yolo v6. Model ini berhasil mencapai akurasi sebesar 90% pada data uji, atau berhasil mendeteksi objek dengan presisi tinggi" },
                    { src: "Portofolio/TryDeepl1.jpeg", title: "Learn DeepLearning", description: "Percobaan Menggunakan dataset dari library Python dan diintegrasikan dengan computer vision untuk deteksi objek. Setiap objek yang terdeteksi diberi bounding box berwarna hijau beserta label dan skor kepercayaan" },
                    { src: "Portofolio/TryDeepl2.jpeg", title: "Learn DeepLearning2", description: "Percobaan Menggunakan dataset dari library Python dan diintegrasikan dengan computer vision untuk deteksi objek. Setiap objek yang terdeteksi diberi bounding box berwarna hijau beserta label dan skor kepercayaan" },
                    { src: "Portofolio/sertif_java.jpg", title: "Java Course", description: "Sertifikat ini menandai keberhasilan saya dalam menyelesaikan seluruh rangkaian Course Memulai Pemrograman Dengan Java. Sertifikat ini Diberikan setelah memenuhi semua syarat kelulusan yang ditentukan dari dicoding."},
                    { src: "Portofolio/sertif_manajemen.jpg", title: "Manajemen Course", description: "Sertifikat ini menandai keberhasilan saya dalam menyelesaikan seluruh rangkaian Course Belajar Dasar Manajemen Proyek. Sertifikat ini Diberikan setelah memenuhi semua syarat kelulusan yang ditentukan dari dicoding." },
                    { src: "Portofolio/sertif_c.jpg", title: "C Course", description: "Sertifikat ini menandai keberhasilan saya dalam menyelesaikan seluruh rangkaian Course Memulai Pemrograman Dengan C. Sertifikat ini Diberikan setelah memenuhi semua syarat kelulusan yang ditentukan dari dicoding." },
                    { src: "Portofolio/Feskrema.jpeg", title: "Anggota Divisi Operator | Kepanitiaan FESKREMA", description: "Bertanggung jawab atas pengelolaan dan eksekusi seluruh aspek teknis acara, termasuk operasional sound system, presentasi visual (PPT/video), dan memastikan kelancaran transisi di setiap sesi acara dari awal hingga akhir." },
                    { src: "Portofolio/MPK.jpeg", title: "Anggota Divisi Operator | Kepanitiaan MPK", description: "Bertanggung jawab atas pengelolaan dan eksekusi seluruh aspek teknis acara, termasuk operasional sound system, presentasi visual (PPT/video), dan memastikan kelancaran transisi di setiap sesi acara dari awal hingga akhir." },
                ]; 
    let current = 0; 
    const carouselImg = document.getElementById("carousel-img"); 
    const modal = document.getElementById("modal"); 
    const modalImg = document.getElementById("modal-img"); 
    const modalTitle = document.getElementById("modal-title"); 
    const modalDesc = document.getElementById("modal-desc"); 

    function showSlide(index) { 
        carouselImg.style.opacity = 0; // fade out 
        setTimeout(() => { 
            carouselImg.src = images[index].src; 
            carouselImg.alt = images[index].title; 
            carouselImg.style.opacity = 1; // fade in }, 300);
        },  300);
    }

    document.getElementById("nextBtn").addEventListener("click", () => { 
        current = (current + 1) % images.length; 
        showSlide(current); 
    }); 

    document.getElementById("prevBtn").addEventListener("click", () => { 
    current = (current - 1 + images.length) % images.length; showSlide(current); 
    }); 

    carouselImg.addEventListener("click", () => { 
        modal.classList.remove("hidden"); 
        modalImg.src = images[current].src; 
        modalTitle.textContent = images[current].title; 
        modalDesc.textContent = images[current].description; 
    }); 

    document.getElementById("closeBtn").addEventListener("click", () => { 
        modal.classList.add("hidden"); 
    }); // Inisialisasi pertama showSlide(current);

    setInterval(() => { 
        current = (current + 1) % images.length; 
        showSlide(current); 
    }, 10000); 
    
    // Inisialisasi pertama 
    showSlide(current);
});